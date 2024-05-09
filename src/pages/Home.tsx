import CreateRoom from '../components/CreateRoom';

const Home: React.FC = () => {
  return(
    <div className='h-screen grid place-items-center'>
      <CreateRoom />
    </div>
  );
};

export default Home;