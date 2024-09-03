import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function IncomeChart() {
    const { incomes } = useGlobalContext();

    // Sort incomes by date
    const sortedIncomes = incomes.sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = {
        labels: sortedIncomes.map((inc) => dateFormat(inc.date)),
        datasets: [
            {
                label: 'Income',
                data: sortedIncomes.map((income) => income.amount),
                backgroundColor: 'green',
                tension: 0.2,
            },
        ],
    };

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    );
}

function ExpenseChart() {
    const { expenses } = useGlobalContext();

    // Sort expenses by date
    const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = {
        labels: sortedExpenses.map((exp) => dateFormat(exp.date)),
        datasets: [
            {
                label: 'Expenses',
                data: sortedExpenses.map((expense) => expense.amount),
                backgroundColor: 'red',
                tension: 0.2,
            },
        ],
    };

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export { IncomeChart, ExpenseChart };
