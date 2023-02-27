import React, { useState } from 'react';
import fileData from '../shared/data';

interface InnerFile {
    type: string;
    name: string;
    added?: any;
}

type File = {
  type: string;
  name: string;
  added?: any;
  files?: InnerFile[];
};

const dataString = JSON.stringify(fileData);
const dataArr = JSON.parse(dataString);
console.log("dataArr", dataArr);



const data: File[] = dataArr

const NewFile = () => {
  const [files, setFiles] = useState<File[]>(data);
  const [currentFolder, setCurrentFolder] = useState<File | null>(null);
  const [sortType, setSortType] = useState<string>('name');
  const [filterValue, setFilterValue] = useState<string>('');

  const handleFolderClick = (folder: File) => {
    setCurrentFolder(folder);
    setFiles(folder.files || []);
  };

  const handleSortClick = (type: string) => {
    setSortType(type);
    const sortedFiles = [...files];
    sortedFiles.sort((a, b) => {
      switch (type) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return (a.files?.length || 0) - (b.files?.length || 0);
        case 'date':
          return new Date(b.added).getTime() - new Date(a.added).getTime();
        default:
          return 0;
      }
    });
    setFiles(sortedFiles);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <div>
        <label>Filter by Filename:</label>
        <input type="text" onChange={handleFilterChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Added</th>
            <th>
              <button onClick={() => handleSortClick('name')}>Sort by Name</button>
            </th>
            <th>
              <button onClick={() => handleSortClick('size')}>Sort by Size</button>
            </th>
            <th>
              <button onClick={() => handleSortClick('date')}>Sort by Date</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file, index) => (
            <tr key={index}>
              <td>{file.type === 'folder' ? <button onClick={() => handleFolderClick(file)}>{file.name}</button> : file.name}</td>
              <td>{file.type}</td>
              <td>{file.added}</td>
              <td>{file.name}</td>
              <td>{file.files?.length || 0}</td>
              <td>{file.added}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewFile;
