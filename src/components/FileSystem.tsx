import React, { useState } from 'react';
import dataArr from '../shared/data';
import Button from './Button';

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

const sortButtonStyle = {
    cursor: 'pointer',
    padding: '2px 15px',
    borderRadius: '5px',
    height: 'fit-content',
    border: '1px solid #e10778',
    color: '#e10778',
    fontWeight: 700,
    width: 'fit-content'
}

const sortFocusStyle = {
    backgroundColor: '#e10778',
    height: 'fit-content',
    color: '#fff',
    padding: '2px 15px',
    borderRadius: '5px',
    fontWeight: 700,
    border: '1px solid #e10778',
}

const data: File[] = dataArr

const FileSystem = () => {
  const [files, setFiles] = useState<File[]>(data);
  const [currentFolder, setCurrentFolder] = useState<File | null>(null);
  const [sortType, setSortType] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  const clearFilters = () => {
    setCurrentFolder(null);
    setSortType('');
    setFilterValue('');
    setFiles(data);
  };
  
  const handleFolderClick = (folder: File) => {
    if (folder.name === currentFolder?.name) {        
        clearFilters();
    } else {
        setCurrentFolder(folder);
        setFiles(folder.files || []);
    }
  };

  const handleSortClick = (type: string) => {
    setSortType(type);
    const sortedFiles = [...files];
    sortedFiles.sort((a, b) => {
      switch (type) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return (b.files?.length || 0) - (a.files?.length || 0);
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
    <div className='FileContainer'>
        <div>
            <span 
                style={sortButtonStyle}
                onClick={clearFilters}
            >
                Clear Filters
            </span>
        </div>

        <div className='FilterSort'>

            <div>
                <label><strong>Filter by Filename: </strong></label>
                <input type="text" onChange={handleFilterChange} id="filter-input-field" role='input-filter' data-testid="filter-input" />
            </div>

            <div className='SortContainer'>
                <span 
                    style={
                        sortType === "name" ? sortFocusStyle : sortButtonStyle
                    }
                    onClick={() => handleSortClick('name')}
                    data-testid="sort-by-name-button"
                >
                    Sort by Name
                </span>
                
                <span 
                    style={
                        sortType === "size" ? sortFocusStyle : sortButtonStyle
                    }
                    onClick={() => handleSortClick('size')}
                    data-testid="sort-by-size-button"
                >
                    Sort by Size
                </span>
                
                <span 
                    style={
                        sortType === "date" ? sortFocusStyle : sortButtonStyle
                    }
                    onClick={() => handleSortClick('date')}
                    data-testid="sort-by-date-button"
                >
                    Sort by Date
                </span>
            </div>
        </div>
      
      <div className='DisplayContainer'>
        <div className="HeaderRow">
            <span className='HeaderItem'>Name</span>
            <span className='HeaderItem'>Type</span>
            <span className='HeaderItem'>Date Added</span>
            <span className='HeaderItem'>Folder Items</span>
        </div>

        <div>
            {
                currentFolder?.name &&
                <Button 
                    style={sortButtonStyle}
                    onClick={() => handleFolderClick({
                        type: '',
                        name: currentFolder?.name
                    })}
                >{currentFolder.name} &#9650;</Button> 
            }
            {filteredFiles.map((file, index) => (
                <div key={index} className='DisplayBody' role="filter-section">
                    <span>
                        {
                            file.type === 'folder' 
                            ? 
                            <Button 
                                style={sortButtonStyle}
                                onClick={() => handleFolderClick(file)}
                            >{file.name} &#9660; </Button> 
                            : 
                            file.name
                        }
                    </span>

                    <span>{file.type}</span>
                    <span>{file.added}</span>
                    <span>{file.files?.length || 0}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FileSystem;
