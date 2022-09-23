import Head from 'next/head'

function HeadComponent({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default HeadComponent
