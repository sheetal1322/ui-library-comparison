import { useState } from 'react';
import type { FormEvent } from 'react';

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';

import {
  DashboardRounded,
  PeopleAltRounded,
  SettingsRounded,
  SchoolRounded,
  AddRounded,
  VisibilityRounded,
  CloseRounded,
  DarkModeRounded,
  LightModeRounded,
} from '@mui/icons-material';

type Student = {
  id: number;
  name: string;
  email: string;
  role: string;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Student');

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', role: 'Student' },
    { id: 2, name: 'Priya Singh', email: 'priya@example.com', role: 'Admin' },
    { id: 3, name: 'Rohan Mehta', email: 'rohan@example.com', role: 'Student' },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#7565D9' },
      background: {
        default: darkMode ? '#141522' : '#F6F7FC',
        paper: darkMode ? '#202132' : '#FFFFFF',
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
  });

  const handleAddStudent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newStudent: Student = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      role,
    };

    setStudents((previous) => [...previous, newStudent]);
    setName('');
    setEmail('');
    setRole('Student');
  };

  const studentCount = students.filter(
    (student) => student.role === 'Student'
  ).length;

  const adminCount = students.filter(
    (student) => student.role === 'Admin'
  ).length;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        {/* SIDEBAR */}
        <Box
          sx={{
            width: 235,
            flexShrink: 0,
            p: 3,
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 5 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <SchoolRounded />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              EduPanel
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            MAIN MENU
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'action.selected',
                color: 'primary.main',
                mb: 1,
              }}
            >
              <DashboardRounded />
              <Typography sx={{ fontWeight: 600 }}>Dashboard</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1.5,
                color: 'text.secondary',
                mb: 1,
              }}
            >
              <PeopleAltRounded />
              <Typography>Students</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1.5,
                color: 'text.secondary',
              }}
            >
              <SettingsRounded />
              <Typography>Settings</Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 8, p: 2, borderRadius: 3, bgcolor: 'action.hover' }}>
            <SchoolRounded color="primary" />
            <Typography sx={{ fontWeight: 700, mt: 1 }}>
              Student Portal
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Manage your student records in one place.
            </Typography>
          </Box>
        </Box>

        {/* MAIN CONTENT */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <AppBar
            position="static"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Dashboard
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Welcome back! Here's your overview.
                </Typography>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(event) => setDarkMode(event.target.checked)}
                    slotProps={{
                      input: { 'aria-label': 'Toggle dark mode' },
                 }}
                  />
                }
                label={darkMode ? <DarkModeRounded /> : <LightModeRounded />}
              />
            </Toolbar>
          </AppBar>

          <Box sx={{ p: { xs: 2, md: 4 } }}>
            {/* SUMMARY CARDS */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(3, 1fr)',
                },
                gap: 2,
                mb: 4,
              }}
            >
              <Paper sx={{ p: 3 }}>
                <Typography color="text.secondary" variant="body2">
                  Total Records
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                  {students.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Registered accounts
                </Typography>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography color="text.secondary" variant="body2">
                  Students
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                  {studentCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Student accounts
                </Typography>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography color="text.secondary" variant="body2">
                  Administrators
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                  {adminCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Admin accounts
                </Typography>
              </Paper>
            </Box>

            {/* ADD STUDENT FORM */}
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AddRounded color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Add New Student
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleAddStudent}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <TextField
                  label="Full Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  fullWidth
                  size="small"
                />

                <TextField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  fullWidth
                  size="small"
                />

                <TextField
                  select
                  label="Role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddRounded />}
                  sx={{ py: 1 }}
                >
                  Add Student
                </Button>
              </Box>
            </Paper>

            {/* STUDENT TABLE */}
            <Paper sx={{ p: { xs: 1, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, p: 1, mb: 2 }}>
                Student Directory
              </Typography>

              <TableContainer>
                <Table>
                  <caption>
                    List of registered students and their account roles
                  </caption>

                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Student</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Role</strong></TableCell>
                      <TableCell align="right"><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar
                              sx={{
                                bgcolor: 'primary.light',
                                color: '#FFFFFF',
                                width: 34,
                                height: 34,
                              }}
                            >
                              {student.name.charAt(0).toUpperCase()}
                            </Avatar>
                            {student.name}
                          </Box>
                        </TableCell>

                        <TableCell>{student.email}</TableCell>

                        <TableCell>
                          <Chip
                            label={student.role}
                            size="small"
                            color={student.role === 'Admin' ? 'secondary' : 'primary'}
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            size="small"
                            startIcon={<VisibilityRounded />}
                            onClick={() => setSelectedStudent(student)}
                            aria-label={`View ${student.name}`}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    {students.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No students added yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* STUDENT DETAILS MODAL */}
      <Dialog
        open={selectedStudent !== null}
        onClose={() => setSelectedStudent(null)}
        fullWidth
        maxWidth="xs"
        aria-labelledby="student-dialog-title"
      >
        {selectedStudent && (
          <>
            <DialogTitle id="student-dialog-title">
              Student Details
              <IconButton
                onClick={() => setSelectedStudent(null)}
                aria-label="Close student details"
                sx={{ position: 'absolute', right: 12, top: 12 }}
              >
                <CloseRounded />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Typography color="text.secondary" variant="body2">
                Full Name
              </Typography>
              <Typography sx={{ fontWeight: 600, mb: 2 }}>
                {selectedStudent.name}
              </Typography>

              <Typography color="text.secondary" variant="body2">
                Email Address
              </Typography>
              <Typography sx={{ fontWeight: 600, mb: 2 }}>
                {selectedStudent.email}
              </Typography>

              <Typography color="text.secondary" variant="body2">
                Role
              </Typography>
              <Chip label={selectedStudent.role} color="primary" size="small" />
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
