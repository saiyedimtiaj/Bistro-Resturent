import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth()
    return (
        <div>
            <h1 className="text-3xl">
                <span>Hi,Welcome {user?.displayName ? user?.displayName : 'Back'}</span>
            </h1>
        </div>
    );
};

export default UserHome;