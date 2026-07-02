import { ChevronLeft, ChevronRight } from 'lucide-react';

const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1899 + 6 }, (_, index) => 1900 + index);

export default function DatePickerHeader({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}: any) {
    return (
        <div className="detech-datepicker-header">
            <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="detech-datepicker-nav"
                aria-label="Bulan sebelumnya"
            >
                <ChevronLeft size={16} />
            </button>

            <div className="detech-datepicker-selects">
                <select
                    value={date.getMonth()}
                    onChange={({ target: { value } }) => changeMonth(Number(value))}
                    className="detech-datepicker-select"
                    aria-label="Pilih bulan"
                >
                    {months.map((month, index) => (
                        <option key={month} value={index}>
                            {month}
                        </option>
                    ))}
                </select>

                <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(Number(value))}
                    className="detech-datepicker-select"
                    aria-label="Pilih tahun"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="detech-datepicker-nav"
                aria-label="Bulan berikutnya"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}
