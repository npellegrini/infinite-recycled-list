import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import useGetData from "../../hooks/useGetData";

RecycledList.propTypes = {
    itemFn: PropTypes.func.isRequired,
    itemHeight: PropTypes.number,
    className: PropTypes.string,
    rowOffset: PropTypes.number
}

RecycledList.defaultProps = {
    itemHeight: 50,
    className: 'default-container',
    rowOffset: 6
}

export default function RecycledList({ itemHeight, itemFn, className, rowOffset }) {
    const [scrollTop, setScrollTop] = useState(0)
    const [viewableHeight, setViewableHeight] = useState(0)
    const wrapper = useRef(null)
    const setScroll = e => setScrollTop(e.target.scrollTop)

    //** Infinite scroll**/
    const [pageNumber, setPageNumber] = useState(1)
    const {
        items,
        hasMore,
        loading,
        error
    } = useGetData(pageNumber)
    const observer = useRef()
    const lastItemElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasMore])
    //** Infinite scroll**/

    useEffect(() => {
        if (wrapper.current) {
            setViewableHeight(parseFloat(window.getComputedStyle(wrapper.current).height))
        }
    }, [])

    const itemStyle = (index) => ({
        height: itemHeight,
        top: itemHeight * index,
    })
    const listStyle = () => ({
        height: items.length * itemHeight,
        position: 'relative'
    })

    const inView = (position) => (position < viewableHeight + scrollTop + (rowOffset - 1) * itemHeight &&
        position > scrollTop - rowOffset * itemHeight)

    return (
        <div className={className} >
            <div className='wrapper-list' ref={wrapper} onScroll={setScroll}>
                <div style={listStyle()} >
                    {items.map(
                        (attrs, index) => inView(index * itemHeight) &&
                            ((items.length === index + 1) ?
                            (<div className='item-wrapper' ref={lastItemElementRef} key={index} style={itemStyle(index, itemHeight)}>
                                {itemFn(attrs)}
                            </div>) : 
                            <div className='item-wrapper' key={index} style={itemStyle(index, itemHeight)}>
                                {itemFn(attrs)}
                            </div>)
                    )
                    }
                </div>
                <div>{loading && !error && 'Loading...'}</div>
                <div>{error && 'Error'}</div>
            </div>
        </div>
    )
}