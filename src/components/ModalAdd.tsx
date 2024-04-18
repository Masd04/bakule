import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { closeButton  } from "../../public/img";
import { useSession } from "next-auth/react";
import emailjs from "@emailjs/browser"

emailjs.init({publicKey: 'hPcJNDRpyvCulCBHi',});

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface ExtendedSession {
  user: {
    id: string;
    name: string;
  }
}

const ModalAdd: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: session } = useSession() as { data: ExtendedSession };
  const user = session?.user;

  if (!isVisible) return null;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);


    const form = e.currentTarget;
    const serverNameInput = form.elements.namedItem('value2') as HTMLTextAreaElement;
  
  
    const emailParams = {
      user_id: user.id,
      user_name: user.name,
      server_name: serverNameInput.value,
    };
  
    emailjs.send('service_nm47c3f', 'template_9p79oos', emailParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setEmailSent(true);
        setIsSubmitting(false);
        setTimeout(() => {
          setEmailSent(false);
          onClose(); // Close the modal after showing the success message
        }, 3000); // Show the success message for
        
      }, (err) => {
        console.error('FAILED...', err);
        setIsSubmitting(false);
      });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[45%] flex flex-col bg-white px-5 pb-5 pt-2 rounded-md shadow-lg">
        
      <div className="flex items-center justify-between">
        <h2 className="se:text-md xr:text-lg promax:text-xl sm:text-2xl md:text-3xl ml-10 font-bold text-center flex-grow">Request new community</h2>
        <button className="ml-auto hover:scale-105" onClick={() => onClose() } aria-label="Close">
        <Image 
          src={closeButton as StaticImageData}
          alt='Go back button'
          width={40}
          height={40}
          />
        </button>
      </div>

      {emailSent ? (
        <div className="flex justify-center" id="sentMessage">
          <div className="w-[70%] text-center font-bold p-4 mt-4 mb-4 text-xl text-green-700 bg-green-100 rounded-md" role="alert">
            Your request has been sent successfully!
          </div>
        </div>
        ) : (
        <form className="flex flex-col space-y-4" onSubmit={sendEmail}>
          <div>
            <label htmlFor="value2" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300">Server name:</label>
            <textarea 
              id="value2" 
              maxLength={100} 
              rows={1}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              style={{ overflowY: 'hidden', resize: 'none' }}
              onInput={handleInput}
            />
          </div>

          <button type="submit"
                  className="rounded bg-[#270858] md:w-[25%] md:mx-auto pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-0 active:bg-opacity-80"
          >
          {isSubmitting ? 'Sending...' : 'Request'}
          </button>
        </form>
        )}
        
      </div>

    </div>
  );
};

export default ModalAdd;
