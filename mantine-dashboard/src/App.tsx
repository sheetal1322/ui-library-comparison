
import { useState } from 'react';
import {
  MantineProvider,
  Paper,
  Text,
  Title,
  Button,
  TextInput,
  Select,
  Table,
  Modal,
  Switch,
  Badge,
  Avatar,
  Group,
  Stack,
  SimpleGrid,
  Box,
  Divider,
  ActionIcon,
} from '@mantine/core';

import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconSun,
  IconMoon,
  IconUser,
} from '@tabler/icons-react';

type Student = {
  id: number;
  name: string;
  email: string;
  role: 'Student' | 'Admin';
};

const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    role: 'Student',
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya@example.com',
    role: 'Student',
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    email: 'rohan@example.com',
    role: 'Admin',
  },
];

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string | null>('Student');

  const studentCount = students.filter(
    (student) => student.role === 'Student'
  ).length;

  const adminCount = students.filter(
    (student) => student.role === 'Admin'
  ).length;

  const handleAddStudent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !role) {
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      role: role as Student['role'],
    };

    setStudents((previous) => [...previous, newStudent]);

    setName('');
    setEmail('');
    setRole('Student');
  };

  return (
    <MantineProvider
      theme={{
        primaryColor: 'violet',
        defaultRadius: 'md',
      }}
      forceColorScheme={darkMode ? 'dark' : 'light'}
    >
      <Group align="stretch" gap={0} wrap="nowrap" mih="100vh">
        {/* Sidebar */}
        <Paper
          w={220}
          radius={0}
          p="md"
          style={{
            flexShrink: 0,
            borderRight: '1px solid var(--mantine-color-default-border)',
          }}
        >
          <Title order={3} c="violet" mb="xl" mt="sm">
            EduPanel
          </Title>

          <Stack gap="xs">
            <Button
              variant="light"
              color="violet"
              justify="flex-start"
              leftSection={<IconDashboard size={18} />}
              fullWidth
            >
              Dashboard
            </Button>

            <Button
              variant="subtle"
              color="gray"
              justify="flex-start"
              leftSection={<IconUsers size={18} />}
              fullWidth
            >
              Students
            </Button>

            <Button
              variant="subtle"
              color="gray"
              justify="flex-start"
              leftSection={<IconSettings size={18} />}
              fullWidth
            >
              Settings
            </Button>
          </Stack>
        </Paper>

        {/* Main area */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <Paper
            radius={0}
            p="md"
            withBorder
            style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          >
            <Group justify="space-between">
              <Title order={4}>Dashboard</Title>

              <Group gap="xs">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  aria-label={darkMode ? 'Dark mode' : 'Light mode'}
                >
                  {darkMode ? (
                    <IconMoon size={20} />
                  ) : (
                    <IconSun size={20} />
                  )}
                </ActionIcon>

                <Switch
                  checked={darkMode}
                  onChange={(event) =>
                    setDarkMode(event.currentTarget.checked)
                  }
                  aria-label="Toggle dark mode"
                />
              </Group>
            </Group>
          </Paper>

          {/* Dashboard content */}
          <Stack p="lg" gap="lg">
            <Box>
              <Title order={3}>Welcome to EduPanel</Title>
              <Text c="dimmed" size="sm" mt={4}>
                Manage students and view dashboard information.
              </Text>
            </Box>

            {/* Summary cards */}
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
              <Paper withBorder p="lg" radius="md">
                <Text c="dimmed" size="sm">
                  Total Records
                </Text>
                <Title order={2} mt="xs">
                  {students.length}
                </Title>
              </Paper>

              <Paper withBorder p="lg" radius="md">
                <Text c="dimmed" size="sm">
                  Student Accounts
                </Text>
                <Title order={2} mt="xs">
                  {studentCount}
                </Title>
              </Paper>

              <Paper withBorder p="lg" radius="md">
                <Text c="dimmed" size="sm">
                  Administrators
                </Text>
                <Title order={2} mt="xs">
                  {adminCount}
                </Title>
              </Paper>
            </SimpleGrid>

            {/* Student form */}
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb="lg">
                Add New Student
              </Title>

              <form onSubmit={handleAddStudent}>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                  <TextInput
                    label="Full Name"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(event) =>
                      setName(event.currentTarget.value)
                    }
                    required
                  />

                  <TextInput
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.currentTarget.value)
                    }
                    required
                  />

                  <Select
                    label="Role"
                    data={['Student', 'Admin']}
                    value={role}
                    onChange={setRole}
                    required
                  />
                </SimpleGrid>

                <Button type="submit" mt="lg">
                  Add Student
                </Button>
              </form>
            </Paper>

            {/* Student table */}
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb="lg">
                Student Directory
              </Title>

              <Box style={{ overflowX: 'auto' }}>
                <Table
                  striped
                  highlightOnHover
                  withTableBorder
                  withColumnBorders
                  miw={550}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Role</Table.Th>
                      <Table.Th>Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {students.map((student) => (
                      <Table.Tr key={student.id}>
                        <Table.Td>
                          <Group gap="sm" wrap="nowrap">
                            <Avatar color="violet" radius="xl">
                              <IconUser size={18} />
                            </Avatar>
                            <Text fw={500}>{student.name}</Text>
                          </Group>
                        </Table.Td>

                        <Table.Td>{student.email}</Table.Td>

                        <Table.Td>
                          <Badge
                            color={
                              student.role === 'Admin'
                                ? 'grape'
                                : 'blue'
                            }
                          >
                            {student.role}
                          </Badge>
                        </Table.Td>

                        <Table.Td>
                          <Button
                            variant="subtle"
                            size="xs"
                            onClick={() => setSelectedStudent(student)}
                          >
                            View
                          </Button>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Box>
            </Paper>
          </Stack>
        </Box>

        {/* Student details modal */}
        <Modal
          opened={selectedStudent !== null}
          onClose={() => setSelectedStudent(null)}
          title="Student Details"
          centered
        >
          {selectedStudent && (
            <Stack gap="md">
              <Avatar color="violet" size={64} radius="xl">
                <IconUser size={30} />
              </Avatar>

              <Divider />

              <Text>
                <strong>Name:</strong> {selectedStudent.name}
              </Text>

              <Text>
                <strong>Email:</strong> {selectedStudent.email}
              </Text>

              <Text>
                <strong>Role:</strong> {selectedStudent.role}
              </Text>

              <Button onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </Stack>
          )}
        </Modal>
      </Group>
    </MantineProvider>
  );
}

export default App;
