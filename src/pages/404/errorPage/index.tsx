import { Button } from '@mantine/core';
import image from '../../../assets/404Error.svg';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center p-10 container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 items-center">
                {/* Mobile image */}
                <img src={image} className="sm:hidden" alt="Not found" />

                <div>
                    <h1
                        className="text-4xl font-bold text-[34px] sm:pt-9 mb-4 font-outfit sm:text-[32px]"
                        style={{ color: '#830999' }}
                    >
                        Something is not right...
                    </h1>
                    <p className="text-gray-700 text-lg mb-6">
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </p>
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => navigate('/')}
                        className="lg:w-64 mt-6 p-3 sm:w-full border rounded-md"
                        style={{ backgroundColor: '#830999' }}
                    >
                        Get back to home page
                    </Button>
                </div>

                {/* Desktop image */}
                <img src={image} className="hidden sm:block" alt="Not found" />
            </div>
        </div>
    );
};

export default NotFound;
