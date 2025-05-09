import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider/Authprovider';
import './HomePage.css';

const HomePage = () => {
	const { user, logout } = useAuth();
	const [files, setFiles] = useState([]);
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		// Fetch files when component mounts
		fetchFiles();
	}, []);

	const fetchFiles = async () => {
		try {
			const response = await fetch('/api/files/list/');
			const data = await response.json();
			setFiles(data);
		} catch (error) {
			console.error('Error fetching files:', error);
		}
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		};

		const uploadFile = async () => {
		if (!file) return;
		
		setUploading(true);
		const formData = new FormData();
		formData.append('file', file);
		
		try {
			const response = await fetch(`/api/files/upload/?user_id=${user.id}`, {
			method: 'POST',
			body: formData,
			});
			
			if (response.ok) {
			alert('File uploaded successfully!');
			setFile(null);
			fetchFiles(); // Refresh file list
			} else {
			const error = await response.json();
			alert(`Upload failed: ${error.detail || 'Unknown error'}`);
			}
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('Upload failed. See console for details.');
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="home-container">
			<header className="home-header">
				<h1>File Home Server</h1>
				<div className="user-info">
					<span>Welcome, {user?.username}</span>
					<button onClick={logout} className="logout-btn">Logout</button>
				</div>
			</header>

			<main className="home-content">
				<section className="file-upload">
					<h2>Upload New File</h2>
					<div className="upload-form">
						<input 
						type="file" 
						onChange={handleFileChange}
						disabled={uploading} 
						/>
						<button 
						onClick={uploadFile} 
						disabled={!file || uploading}
						className="upload-btn"
						>
						{uploading ? 'Uploading...' : 'Upload File'}
						</button>
					</div>
				</section>
				<section className="file-list">
					<h2>Your Files</h2>
					{files.length > 0 ? (
						<table>
							<thead className='table-header'>
								<tr>
									<th>File Name</th>
									<th>Size</th>
									<th>Type</th>
									<th>Date</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{files.map((file) => (
									<tr key={file.id}>
										<td>{file.file_name}</td>
										<td>{file.file_size ? `${Math.round(file.file_size / 1024)} KB` : 'N/A'}</td>
										<td>{file.file_type}</td>
										<td>{file.date_upload ? new Date(file.date_upload).toLocaleDateString() : 'N/A'}</td>
										<td>
											<button onClick={() => window.open(`/api/files/download/${file.id}`)}>
												Download
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No files found. Upload your first file!</p>
					)}
				</section>
			</main>
		</div>
	);
};

export default HomePage;