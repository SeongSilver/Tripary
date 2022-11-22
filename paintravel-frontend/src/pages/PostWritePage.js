import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import PostWrite from "../components/post/PostWrite";

function PostWritePage() {
    return (
      <>
        <Header />
        <PostWrite />
        <Footer />
      </>
    );
  }
  
  export default PostWritePage;