// components/ModalAdd.tsx
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { closeButton  } from "../../public/img";
import { useSession } from "next-auth/react";
import { api } from '~/utils/api';
import styles from '../styles/style.js'



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
  const [error, setError] = useState('');
  
  const { data: session } = useSession() as { data: ExtendedSession };
  const user = session?.user;

  // Use the api object to create the mutation hook
  const sendEmailMutation = api.email.sendEmail.useMutation();

  if (!isVisible) return null;
  
  //Input field size
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    setError('');
  };

  //Send Email
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverNameInput = e.currentTarget.elements.namedItem('value2') as HTMLTextAreaElement;
    const serverName = serverNameInput.value.trim();

    if  (!serverName) {
      setError('! Server name is required !');
      return;
    }
    if (serverName.length < 3 || serverName.length > 50) {
    setError('! Server name must be between 3 and 50 characters !');
    return;
    }
    
    if (user?.id) {
      setIsSubmitting(true);

  
    sendEmailMutation.mutate({
      serverName: serverName,
      userId: user.id,
    }, {
      onSuccess: () => {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
          onClose();
        }, 1500); // Show the success message for 3 seconds
      },
      onError: (error) => {
        // Handle the error state
        console.error('Failed to send email :( : ', error);
        alert('Failed to send email: ' + error.message);
      },
      onSettled: () => {
        // This will be called whether the mutation is successful or fails
        setIsSubmitting(false);
      },
    });
  } else {
    alert('User session not found. Please log in to send an email.');
  }
};

  return (
    <div className={`${styles.modalContainer} ${styles.flexCenter}`}>

      <div className={`${styles.formContainer} ${styles.flexCol}`}>
        
      <div className="flex items-center justify-between">
        <h2 className={`${styles.formTitle} ml-10 flex-grow`}>Request new community</h2>
        <button className={`${styles.modalClose}`} onClick={() => onClose() } aria-label="Close">
        <Image 
          src={closeButton as StaticImageData}
          alt='Go back button'
          width={40}
          height={40}
          />
        </button>
      </div>

      {error && (
          <div id="inputFail" className="text-cpred text-lg text-center pt-2">{error}</div>
        )}

      {emailSent ? (
        <div className="flex justify-center" id="sentMessage">
          <div className="w-[70%] text-center font-bold p-4 mt-4 mb-4 text-xl text-green-700 bg-green-100 rounded-md" role="alert">
            Your request has been sent successfully!
          </div>
        </div>
        ) : (      
        <form className={`${styles.flexCol} space-y-4`} onSubmit={sendEmail}>
          <div>
            <label htmlFor="value2" className={`${styles.modaLabel}`}>Server name:</label>
            <textarea 
              id="value2" 
              maxLength={50} 
              rows={1}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              style={{ overflowY: 'hidden', resize: 'none' }}
              onInput={handleInput}
            />
          </div>

          <button type="submit" className={`${styles.modalSub}`}>
          {isSubmitting ? 'Sending...' : 'Request'}
          </button>
        </form>
        )}

        
      </div>

    </div>
  );
};

export default ModalAdd;
