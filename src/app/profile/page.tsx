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
      cancelButtonText: 'Batal',
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

  // Function to handle exporting bookmarks
  const handleExportBookmark = () => {
    // Retrieve your bookmark data, e.g., from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

    // Check if there are bookmarks to export
    if (bookmarks.length > 0) {
      // Create a Blob containing the JSON data
      const blob = new Blob([JSON.stringify(bookmarks)], { type: 'application/json' });

      // Create a download link and trigger a click to start the download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookmarks.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Display a message if there are no bookmarks to export
      Swal.fire('Tidak Ada Bookmark', 'Tidak ada bookmark untuk diekspor.', 'info');
    }
  };

  // Function to handle importing bookmarks
  const handleImportBookmark = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const importedBookmarks = JSON.parse(e.target?.result as string);

          // Update your bookmarks data in localStorage or perform necessary actions
          localStorage.setItem('bookmarks', JSON.stringify(importedBookmarks));

          Swal.fire('Import Berhasil', 'Bookmark berhasil diimpor.', 'success');
        } catch (error) {
          console.error('Error parsing imported bookmarks:', error);
          Swal.fire('Import Gagal', 'Terjadi kesalahan saat mengimpor bookmark.', 'error');
        }
      };

      reader.readAsText(file);
    }
  };

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

      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          onClick={handleDeleteData}
        >
          Hapus Bookmark
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
          onClick={handleExportBookmark}
        >
          Export Bookmark
        </button>

        <label className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mt-4 rounded">
          <center>Import Bookmark</center>
          <input type="file" accept=".json" onChange={handleImportBookmark} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ProfilePage;
