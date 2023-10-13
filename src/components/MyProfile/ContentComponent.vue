<template>
    <div class="container">
        <section class="home" id="home">
            <h3>Hi there...</h3>
            <h3 class="name">My name is <span>Nguyễn Khắc Anh</span></h3>
            <h3 class="post">
                I am a <span class="typing-text">Front end Developer</span>
            </h3>

            <a download="NguyenKhacAnh_CV.pdf" href="CV/CV-NguyenKhacAnh.pdf" class="button button--flex"><button
                    class="btn">Hire me</button></a>

            <div class="share">
                <a href="" target="_blank" class="fab fa-facebook-f"></a>
                <a href="" target="_blank" class="fab fa-github"></a>
                <a href="" target="_blank" class="fab fa-linkedin"></a>
            </div>
        </section>

        <!-- about section  -->

        <section class="about" id="about">
            <h1 class="heading">About Me</h1>

            <div class="content">
                <h3 class="name">My name is <span>Nguyễn Khắc Anh</span></h3>
                <p>
                    As a junior frontend developer, I am highly skilled in HTML, CSS, JavaScript, and have experience with
                    frameworks like ReactJS and Next.js. I am passionate about creating user-friendly and seemingly
                    appealing web experiences, and I am eager to contribute my knowledge and collaborate with team to build
                    innovative digital solutions. With a strong attention to detail, a dedication to continuous learning,
                    and a strong ability to work well in a team, I believe I would be a valuable asset to organization.
                </p>
                <p>
                    Please download my resume for consideration. I would welcome the opportunity to discuss further how my
                    skills and experience align with requirements. Thank you for considering my application.
                </p>
            </div>

            <div class="box-container">
                <div class="box">
                    <i class="fab fa-html5"></i>
                </div>

                <div class="box">
                    <i class="fab fa-css3"></i>
                </div>

                <div class="box">
                    <i class="fab fa-js"></i>
                </div>

                <div class="box">
                    <i class="fab fa-react"></i>
                </div>

                <div class="box">
                    <i class="fab fa-node-js"></i>
                </div>

                <div class="box">
                    <i class="fab fa-java"></i>
                </div>
            </div>
        </section>

        <!-- service section  -->
        <section class="project" id="project">
            <h1 class="heading">My Projects</h1>
            <div class="project-container">
                <div class="project-item">
                    <div class="project-content">
                        <h1>
                            <a href="https://airbnb-bt.vercel.app/" target="_blank">Airbnb Home booking</a>
                        </h1>
                        <p>
                            <span>Description: </span> My self learning NextJs, Users can book hotels and post information
                            about their hotels for others to be aware of and make reservations.
                        </p>
                        <p>
                            <span>Technical: </span> NextJs, Prisma, Typescript, Tailwind
                        </p>
                        <p><span>Team size: </span> 1</p>
                        <p><span>Time: </span></p>
                        <p><span>Position: </span></p>
                        <p>
                            <span>Task: </span>
                        </p>

                        <p></p>
                    </div>
                    <div class="project-img">
                        <img src="/assets/images/airbnb.png" alt="">
                    </div>
                    <div class="line">
                        <hr>
                    </div>

                </div>
                <div class="project-item">
                    <div class="project-content">
                        <h1>
                            <a href="http://spacenter-bt.surge.sh/" target="_blank">Spa Center</a>
                        </h1>
                        <p>
                            <span>Description: </span> Spa website app, customers can book
                            appointment, see their vouchers. Admin manage appointment, spa
                            service, voucher.
                        </p>
                        <p>
                            <span>Technical: </span> ReactJs, Redux, NodeJs, Mongo, Socket
                        </p>
                        <p><span>Team size: </span> 2</p>
                        <p><span>Time: </span></p>
                        <p><span>Position: </span>Developer</p>
                        <p>
                            <span>Task: </span>Writing front-end, test and fix bug back-end
                        </p>

                        <p></p>
                    </div>
                    <div class="project-img">
                        <img src="/assets/images/spacenter.png" alt="">
                    </div>
                    <div class="line">
                        <hr>
                    </div>

                </div>

            </div>
        </section>
    </div>
</template>