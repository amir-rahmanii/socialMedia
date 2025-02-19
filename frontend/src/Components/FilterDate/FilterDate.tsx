
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { PropsWithChildren } from 'react';
import useGetData from '../../hooks/useGetData';
import { userInformation } from '../../hooks/user/user.types';



type FilterDateProps = {
    fromPicker: Dayjs | null;
    setFromPicker: (value: Dayjs | null) => void;
    untilPicker: Dayjs | null;
    setUntilPicker: (value: Dayjs | null) => void;
    filterDateHandler: (value : any) => void;
}

const FilterDate: React.FC<PropsWithChildren<FilterDateProps>> = ({
    fromPicker,
    setFromPicker,
    untilPicker,
    setUntilPicker,
    filterDateHandler,
    children
}) => {

    const handleDateFromChange = (newValueDate: Dayjs | null) => {
        setFromPicker(newValueDate);
        if (newValueDate && untilPicker && dayjs(untilPicker).isBefore(newValueDate)) {
            setUntilPicker(dayjs());
        }
    };

    const handleDateUntilChange = (newValueDate: Dayjs | null) => {
        setUntilPicker(newValueDate);
    };

    const { data: myInfo } = useGetData<userInformation>(
        ["getMyUserInfo"],
        "users/user-information"
    );




    return (
        <div>
            <div className="flex flex-col min-w-60 rounded-sm">
                <form onSubmit={e => e.preventDefault()} className=' flex flex-col my-6 px-3 gap-4'>
                    <div className='flex flex-col gap-4  md:flex-row md:justify-between'>
                        <DatePicker
                            label="From this date picker"
                            value={fromPicker}
                            onChange={handleDateFromChange}
                            maxDate={dayjs()}
                            minDate={dayjs(myInfo?.createdAt)}
                        />
                        <DatePicker
                            label="Until this date picker"
                            value={untilPicker}
                            onChange={handleDateUntilChange}
                            maxDate={dayjs()}
                            minDate={dayjs(fromPicker)} // Set the minDate to ensure it's not before fromDate
                        />
                    </div>

                    {children}
                    <button
                        onClick={filterDateHandler}
                        type="submit"
                        className={`font-sans py-2 rounded-sm text-white w-full duration-300 transition-all bg-primary-blue`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FilterDate;
