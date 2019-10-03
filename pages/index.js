import Head from 'next/head'
import '../Assets/Headers/index'
export default function About() {
    return (
      <div>
      <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <Head>
        <link href="http://localhost:3000/static/index.css" rel="stylesheet"></link>
      </Head>
      <header className="masthead mb-auto">
        <div className="inner">
          <h3 className="masthead-brand">😎 SUPER TALLY</h3>
          <nav className="nav nav-masthead justify-content-center">
            <a className="nav-link active" href="/auth">LOGIN or Register</a>
   
          </nav>
        </div>
      </header>

      <main role="main" className="inner cover">
        <img height="500" src="../static/img/clip-programming.png" />
        <h1 className="cover-heading">TALLY WEB Interface </h1>
        <p className="lead">This Applicaiton Will take your realtime tally data and show it to you on a web Interface.</p>
        <p className="lead">
          <a href="/auth" className="btn btn-lg btn-secondary">Learn more</a>
        </p>
      </main>

      <footer className="mastfoot mt-auto">
        <div className="inner">
          <p>Created by <a href="https://super-sami.com/">SuperSami</a>, by <a href="https://twitter.com/dksamii">@dksamii</a>.</p>
        </div>
      </footer>
    </div></div>);
  }