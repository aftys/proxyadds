import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { useStateContext } from '../../../contexts';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri'


interface Props {
    isSidebarOpen: Boolean
}

const LougoutConfirmation: React.FC<Props> = ({ isSidebarOpen }) => {
    const [open, setOpen] = useState(false);
    const { setUserData } = useStateContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from context and local storage
        setUserData({
            token: '',
            user: null,
        });
        localStorage.removeItem('auth-token');

        // Redirect to the login page or any other desired route
        navigate('/login');
    };

    return (
        <>
            <div className='text-white w-full bg-main-blue dark:bg-blue-950 dark:bg-blue-950 flex rounded-md p-5  h-7  text-gray-500 text-sm items-center gap-x-4' onClick={() => setOpen(true)}>
                <RiLogoutCircleRLine />
                <span className={`${!isSidebarOpen && "hidden"} origin-left duration-400`}>
                    Logout
                </span>
            </div>
            <Modal
                title="Sign out Confirmation"
                centered
                open={open}
                onOk={() => {
                    handleLogout()
                    setOpen(false)

                }
                }
                onCancel={() => setOpen(false)}
                width={300}
                okButtonProps={{ className: "text-white bg-main-blue shadow" }}
            >
                <p>vous êtes sûr de se deconnecter de votre compte</p>
            </Modal>
        </>
    );
}

export default LougoutConfirmation;