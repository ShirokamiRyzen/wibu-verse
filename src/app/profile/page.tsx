'use client'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Interface for user device information
interface UserDeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
}

// Functional component ProfilePage
const ProfilePage: React.FC = () => {
  // State for user IP
  const [userIp, setUserIp] = useState('');

  // State for user device information
  const [userDeviceInfo, setUserDeviceInfo] = useState<UserDeviceInfo | null>(null);

  // useEffect to fetch user IP and device information on component mount
  useEffect(() => {
    // Fetching user IP
    fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setUserIp(data.ip))
      .catch(error => console.error('Error fetching IP:', error));

    // Fetching user device information
    setUserDeviceInfo({
      userAgent: navigator.userAgent || '',
      platform: navigator.platform || '',
      language: navigator.language || '',
    });
  }, []);

  // Function to handle deleting cookies and local storage
  const handleDeleteData = () => {
    // Use SweetAlert2 for confirmation
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Deleting cookies
        document.cookie.split(';').forEach(function (c) {
          document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });

        // Clearing local storage
        localStorage.clear();

        Swal.fire('Hapus!', 'Bookmark berhasil dihapus.', 'success');
      }
    });
  };

  // JSX for the component
  return (
    <div className="container mx-auto my-8 p-8">
      <h1 className="text-3xl font-bold mb-4">Profil Pengguna</h1>

      <p className="mb-4">IP Pengguna: {userIp}</p>
      
      {userDeviceInfo && (
        <div>
          <h2 className="text-xl font-bold mb-2">Informasi Perangkat</h2>
          <p>User Agent: {userDeviceInfo.userAgent}</p>
          <p>Platform: {userDeviceInfo.platform}</p>
          <p>Bahasa: {userDeviceInfo.language}</p>
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={handleDeleteData}
      >
        Hapus Bookmark
      </button>
    </div>
  );
};

export default ProfilePage;
