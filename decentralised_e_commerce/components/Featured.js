import React, { useState, useContext } from 'react'
import { CgColorBucket } from 'react-icons/cg'
import { AmazonContext } from '../context/AmazonContext'

const Featured = () => {
  const [cardColor] = useState([
    'bg-gradient-to-r from-[#9e7351] to-[#6b504e]',
    'bg-gradient-to-r from-[#0d141c] to-[#42667e]',
    'bg-gradient-to-r from-[#424b52] to-[#908d94]',
  ])

  const styles = {
    container: `h-[400px] w-full flex p-[20px] flex-col`,
    title: `text-2xl font-bolder mb-[20px] mt-[30px] mb-24 ml-[40px]`,
    cards: `h-full w-full flex gap-[100px] justify-between mb-[30px] ml-[30px]`,
    card1: `h-[130px] w-[400px] p-[20px] rounded-3xl bg-gradient-to-l from-[#0d141c] to-[#42667e] relative cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl border-2 border-[#fb9701]`,
    card2: `h-[130px] w-[400px] p-[20px] rounded-3xl bg-gradient-to-l from-[#0d141c] to-[#42667e] relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#fb9701]`,
    card3: `h-[130px] w-[400px] p-[20px] rounded-3xl bg-gradient-to-l from-[#0d141c] to-[#42667e] relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#fb9701]`,
    card4: `h-[130px] w-[400px] p-[20px] rounded-3xl bg-gradient-to-l from-[#0d141c] to-[#42667e] relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#fb9701]`,
    cardCross: `h-[180px] w-[125px] rounded-3xl absolute bottom-[20px] left-[20px] transition-all duration-300 hover:scale-105 flex  overflow-hidden`,
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>Top Products</div>
      <div className={styles.cards}>
        <div className={styles.card1}>
          <div className={styles.cardCross}>
            <div className='object-cover'>
              <img src='https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907_inline.jpg.large.jpg' />
            </div>
          </div><p style={{color: "white", textAlign: 'right' }}>IPHONE 14 PRO </p>
        </div>
        <div className={styles.card2}>
          <div className={styles.cardCross}>
          <div className='object-cover'>
              <img src='https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907_inline.jpg.large.jpg' />
            </div>
          </div> <p style={{color: "white", textAlign: 'right' }}>hinfyddss</p>
        </div>
        <div className={styles.card3}>
          <div className={styles.cardCross}>
            <div className='object-cover'>
              <img src='https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907_inline.jpg.large.jpg' />
            </div>
          </div><p style={{color: "white", textAlign: 'right' }}>hinfyddss</p>
        </div>
        <div className={styles.card4}>
          <div className={styles.cardCross}>
          <div className='object-cover'>
              <img src='https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907_inline.jpg.large.jpg' />
            </div>
          </div><p style={{color: "white", textAlign: 'right' }}>hinfyddss</p>
        </div>
      </div>
    </div>
  )
}

export default Featured
