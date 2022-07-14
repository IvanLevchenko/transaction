import React, {useEffect, useState} from "react";
import './Paginator.scss'

import rightArrow from '../../assets/paginator-arrow.svg'
import leftArrow from '../../assets/paginator-arrow.svg'

export default function Paginator({onPageChange, maxPageAmount}) {
  const [pages, setPages] = useState(new Array(5).fill('').map((page, index) => page = index + 1))
  let [currentPage, setCurrentPage] = useState(1)
  
  const selectPage = (selectedPage) => {
    setCurrentPage(selectedPage)
    if(pages.length == 1) {
      return 
    }
    if(pages.indexOf(selectedPage) > 2) {
      setPages(pages.map((page) => {
        if(pages[pages.length - 1] + 1 <= maxPageAmount) {
          return page += 1
        } else {
          return page
        }
      }))
    } else {
      setPages(pages.map((page) => {
        if(pages[pages.length - 1] - 1 >= pages.length) {
          return page -= 1
        } else {
          return page
        }
      }))
    }
    onPageChange(selectedPage)
  }

  useEffect(() => {
    setPages(new Array(maxPageAmount < 5 ? maxPageAmount : 5).fill('').map((page, index) => page = index + 1))
  }, [maxPageAmount])

  return (
    <div className="paginator">
      <img 
        src={leftArrow} 
        className="paginator__left-btn" 
        alt="left arrow" 
        onClick={() => currentPage > 1 ? selectPage(currentPage - 2) : null}
      />
      <div className="pages">
        {
          pages.map((page) => {
            return (
              <div 
                className={`pages__block ${page == currentPage ? 'selected' : ''}`}
                key={Math.random()}
                onClick={() => selectPage(page)}
              >{page}</div>
            ) 
          })
        }
      </div>
      <img 
        src={rightArrow} 
        className="paginator__right-btn" 
        alt="right arrow"
        onClick={() => currentPage < 5 ? selectPage(currentPage + 2) : null}
      />
    </div>
  )
}