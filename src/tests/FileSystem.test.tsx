import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FileSystem from '../components/FileSystem';
import dataArr from '../shared/data';
import Button from '../components/Button';


test('renders clear filters button', () => {
    render(<FileSystem />);
    const clearFilterButton = screen.getByText(/clear filters/i);
    expect (clearFilterButton).toBeInTheDocument();
})

test('filters dataArr by filename when filter input is entered', () => {
    render(<FileSystem />);
    const filterInput = screen.getByTestId('filter-input') as HTMLInputElement;
    fireEvent.change(filterInput, { target: { value: 'Expenses' } });

    expect(filterInput.value).toBe('Expenses')
});

test('renders Sort by Name button', () => {
    render(<FileSystem />);
    const sortByNameButton = screen.getByText(/Sort by Name/i);
    expect (sortByNameButton).toBeInTheDocument();
})

test('renders Sort by Size button', () => {
    render(<FileSystem />);
    const sortBySizeButton = screen.getByText(/Sort by Size/i);
    expect (sortBySizeButton).toBeInTheDocument();
})

test('renders Sort by Date button', () => {
    render(<FileSystem />);
    const sortByDateButton = screen.getByText(/Sort by Date/i);
    expect (sortByDateButton).toBeInTheDocument();
})

test('handles button onClick', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/click me/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
})

test('renders files and folders', () => {
    render(<FileSystem />);
    const filterItems = screen.getAllByRole('filter-section')
    expect(filterItems[0]).toHaveTextContent(dataArr[0].name)
    expect(filterItems[0]).toHaveTextContent(dataArr[0].type)
    expect(filterItems[0]).toHaveTextContent(dataArr[0].added)
})


// test('renders files and folders with correct names', () => {
//     render(<FileSystem />);
//     const employeeHandbookFile = screen.getByText(/'Employee Handbook'/i);
//     const expensesFolder = screen.getByText(/'expenses'/i);
//     expect(employeeHandbookFile).toBeInTheDocument();
//     expect(expensesFolder).toBeInTheDocument();
//   });


// test('displays folder contents when folder is clicked', () => {
//     render(<FileSystem />);
//     const expensesFolder = screen.getByText('Expenses');
//     fireEvent.click(expensesFolder);
//     const expensesClaimForm = screen.getByText('Expenses claim form');
//     const fuelAllowances = screen.getByText('Fuel allowances');
//     expect(expensesClaimForm).toBeInTheDocument();
//     expect(fuelAllowances).toBeInTheDocument();
// });


// test('sorts dataArr by name when sort by name button is clicked', () => {
//     render(<FileSystem />);
//     const sortByNameButton = screen.getByTestId('sort-by-name-button');
//     fireEvent.click(sortByNameButton);
//     const employeeHandbook = screen.getByText('Employee Handbook');
//     const expensesFolder = screen.getByText('Expenses');
//     expect(expensesFolder).toBeInTheDocument();
//     expect(employeeHandbook).toBeInTheDocument();
// });


// test('sorts dataArr by date when sort by date button is clicked', () => {
//     render(<FileSystem />);
//     const sortByDateButton = screen.getByTestId('sort-by-date-button');
//     fireEvent.click(sortByDateButton);
//     const employeeHandbook = screen.getByText('Employee Handbook');
//     const expensesFolder = screen.getByText('Expenses');
//     expect(expensesFolder).toBeInTheDocument();
//     expect(employeeHandbook).toBeInTheDocument();
// });



