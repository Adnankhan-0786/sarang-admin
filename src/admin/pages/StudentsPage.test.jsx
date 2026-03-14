import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentsPage from './StudentsPage';

describe('StudentsPage', () => {
  it('renders and allows adding a student', async () => {
    render(<StudentsPage />);

    // Ensure existing student row is visible
    expect(screen.getByText(/Rahul Kumar/i)).toBeInTheDocument();

    // Open add student modal
    const addButton = screen.getByRole('button', { name: /add student/i });
    await userEvent.click(addButton);

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/Admission Number/i), 'ADM999');
    await userEvent.type(screen.getByLabelText(/Name/i), 'Test Student');
    await userEvent.selectOptions(screen.getByLabelText(/Class/i), 'Class 1');
    await userEvent.selectOptions(screen.getByLabelText(/Section/i), 'A');
    await userEvent.type(screen.getByLabelText(/Father Name/i), 'Test Father');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /add student/i });
    await userEvent.click(submitButton);

    // New student should appear in the table
    expect(await screen.findByText(/Test Student/i)).toBeInTheDocument();
  });
});
