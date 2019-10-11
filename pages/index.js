import Head from 'next/head'
import '../Assets/Headers/index'
export default function About() {
    return (
      <div>
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.2/css/lightbox.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"/>

    <link rel="stylesheet" href="../static/css/styles.min.css"/>
      </Head>
      <div>
        <div class="header-blue" style={{backgroundColor:'#172a74'}}>
            <nav class="navbar navbar-dark navbar-expand-md navigation-clean-search">
                <div class="container"><a class="navbar-brand" href="#">SUPERTALLY</a><button class="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse"
                        id="navcol-1">
                        <form class="form-inline mr-auto" target="_self">
                            <div class="form-group"><label for="search-field"></label><input class="form-control search-field" type="search" name="search" id="search-field"/></div>
                        </form><span class="navbar-text"> <a href="/auth" class="login">Log In</a></span><a class="btn btn-light action-button" role="button" href="/auth">Sign Up</a></div>
                </div>
            </nav>
            <div class="container hero">
                <div class="row">
                    <div class="col-12 col-lg-6 col-xl-5 offset-xl-1">
                        <h1>The revolution is here.</h1>
                        <p>This Applicaiton Will take your realtime tally data and show it to you on a web Interface. There is alot of functions that can be used all this is for free.&nbsp;
                            To Get Kicking with this free interface Follow the read me of this <a href="https://github.com/dksami/Super-Tally-Python-Api"></a>
                            <br/></p><button class="btn btn-light btn-lg action-button" type="button">Learn More</button></div>
                    <div
                        class="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder"><img src="../static/img/cherry-message-sent.png" style={{height:500}}/>
                        <div class="iphone-mockup"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="footer-basic">
        <footer>
            <div class="social"><a href="#"><i class="icon ion-social-instagram"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-facebook"></i></a></div>
            <p class="copyright">Super Sami © 2018</p>
        </footer>
    </div>
    <div class="projects-clean"></div>
    <div class="photo-gallery"></div>
    <div class="team-boxed"></div>
    <div class="team-grid"></div>
    <div class="projects-horizontal"></div>
      </div>);
  }