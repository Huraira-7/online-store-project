import gif from '../../assets/downtime_animation.gif'
import { useNavigate } from 'react-router-dom';
function Downtime() {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-screen bg-red-100 flex flex-col items-center justify-center'>
      <span className='text-4xl font-semibold mb-16'> The <span className='cursor-pointer hover:underline' onClick={()=>navigate('/',{replace:true})}> website</span> is undergoing maintenance, it will be back soon in a couple of hours. </span>
      <span className='text-4xl font-semibold mb-16'> Thanks for your patience </span>
      <img src={gif} className='h-auto rounded-full' width={900} alt="My GIF animation" />
    </div>
  )
}

export default Downtime;