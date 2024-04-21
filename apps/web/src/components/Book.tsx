 import { Link } from "react-router-dom";
import { IoMdCopy } from "react-icons/io";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from "react";
import { TiTick } from "react-icons/ti";


interface IProps {
    name: string;
    img: string;
    price: number;
    id: string;
    isEnrolled?: boolean;
    paymentRef?: string;
    author: string;
}

const Book = ({name, img, price, id, isEnrolled, paymentRef, author}: IProps) => {
  const [state, setState] = useState({
    value: '',
    copied: false
  })
  
  return (
    <div className='w-[300px] mb-4 flex flex-col h-[420px]'>
        <div className='h-[250px] w-full'>
            <img src={img} alt="book_img" className='w-full cursor-pointer object-fill h-[250px]' />
        </div>
        <div className=' flex flex-col py-4  items-center justify-center'>
            <span className='text-gray-400 text-[14px] font-poppins'>{author}</span>
            <span className='text-[18px]  text-gray-800 font-poppins'>{name}</span>
            <h4 className='text-red-500 font-poppins font-semibold text-[18px]'>#{price}</h4>
        </div>
        {
          isEnrolled ? <button id="myInput" className="bg-gray-800 text-center text-[14px] flex items-center justify-center text-white font-semibold font-poppins py-4 px-4">paymentRef - {paymentRef} 
           <CopyToClipboard text={paymentRef ?? ''}
          onCopy={() => setState({...state, copied: true})}>
          
          {
            state.copied ? 
            <TiTick size={'20'} className="ml-[4px] text-green-500"  />
            : 
          <IoMdCopy size={'20'} className="ml-[4px] cursor-pointer"  />

            }
          
        </CopyToClipboard>
           </button> : 
        <Link to={`/dashboard/course/${id}`} className="bg-gray-800 text-center text-white font-semibold font-poppins py-4 px-4">Enroll Course</Link>        
        }
    </div>
  )
}

export default Book