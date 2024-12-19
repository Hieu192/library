import React, { useEffect } from 'react'
import './Stats.css'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BookIcon from '@material-ui/icons/Book';
import CategoryIcon from '@material-ui/icons/Category';
import { FetchCount } from '../redux/slices/app';
import { useDispatch, useSelector } from 'react-redux';

function Stats() {
    const dispatch = useDispatch();
    const { counts } = useSelector((state) => state.app);
    // const { countBook, countCategory, countMember, countTransaction } = counts?.counts;
    useEffect(() => {
        dispatch(FetchCount());
    }, []);  
    return (
        <div className='stats'>
            <div className='stats-block'>
                <LibraryBooksIcon className='stats-icon' style={{ fontSize:80 }}/>
                <p className='stats-title'>Tổng đầu sách</p>
                <p className='stats-count'>{counts?.counts?.countBook}</p>
            </div>
            <div className='stats-block'>
                <CategoryIcon className='stats-icon' style={{ fontSize:80 }}/>
                <p className='stats-title'>Tổng thể loại </p>
                <p className='stats-count'>{counts?.counts?.countCategory}</p>
            </div>
            <div className='stats-block'>
                <LocalLibraryIcon className='stats-icon' style={{ fontSize:80 }}/>
                <p className='stats-title'>Tổng thành viên </p>
                <p className='stats-count'>{counts?.counts?.countMember}</p>
            </div>
            <div className='stats-block'>
                <BookIcon className='stats-icon' style={{ fontSize:80 }}/>
                <p className='stats-title'>Tổng số lượt mượn </p>
                <p className='stats-count'>{counts?.counts?.countTransaction}</p>
            </div>
        </div>
    )
}

export default Stats