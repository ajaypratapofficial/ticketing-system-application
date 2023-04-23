import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet"
import { ToastContainer, toast } from "react-toastify";

const Layout = ({children,
        title="Ticket App",
        description="description",
        keywords="keywords",
        author="author"

}) => {
  return (
    <div>
        <Header ></Header>

        <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

        <main style = {{minHeight : "70vh", overflowY: 'scroll' }}>
        <ToastContainer></ToastContainer>
        {children}
        </main>
        <Footer></Footer>
    </div>
  )
}

export default Layout