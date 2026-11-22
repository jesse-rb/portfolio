import "./App.css";
import Tile from "./tile/Tile";
import AssetNotFound from "./assets/404.svg"
import AssetQolboard from "./assets/qolboard.png";
import AssetQolboardLogo from "./assets/qolboard.logo.svg";
import Anchor from "./anchor/Anchor";

function App() {
    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="text-center">
                    <h1 className="mb-4">Jesse Reyneke-Barnard</h1>
                    <div className="flex gap-2 justify-center">
                        <span>Find me @</span>
                        <Anchor
                            rel={"noopener noreferer"}
                            target={"_blank"}
                            href="https://github.com/jesse-rb"
                        >
                            <>GitHub</>
                        </Anchor>
                        <Anchor
                            rel="noopener noreferer"
                            target="_blank"
                            href="https://www.linkedin.com/in/jesse-reyneke-barnard"
                        >
                            <>LinkedIn</>
                        </Anchor>
                    </div>
                </div>

                <div className="flex flex-col gap-4 min-w-[250px]">
                    <h2>About me</h2>
                    <p>
                        &#128187; I am a full stack Software Engineer with over
                        5 years of experience building scalable web applications
                        who thrives in collaborative environments. Experienced
                        in designing reliable APIs, optimizing legacy systems,
                        and delivering intuitive frontend clients. Passionate
                        about solving complex problems, improving user/developer
                        experience, and writing quality software.
                    </p>
                    <p>
                        &#9749; Coffee, outdoor, and computer enthusiast who
                        enjoys adventures, hiking, and snowboarding. Naturally
                        curious about technology and enjoys exploring how things
                        work and building solutions to problems.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2>Work experience &amp; projects</h2>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                        <Tile
                            headlines={["Software Engineer"]}
                            title="CoachMate"
                            src={AssetNotFound}
                            logo={AssetNotFound}
                            href={"https://coachmate.sport"}
                        />
                        <Tile
                            headlines={["Backend Engineer"]}
                            title="Basis"
                            src={AssetNotFound}
                            logo={AssetNotFound}
                            href={"https://wearebasis.com"}
                        />
                        <Tile
                            headlines={[
                                "Software Developer",
                                "Intern Software Developer",
                            ]}
                            title="Enrolmy Software"
                            src={AssetNotFound}
                            logo={AssetNotFound}
                            href={"https://enrolmy.com"}
                        />
                        <Tile
                            headlines={["Personal Project"]}
                            title="qolboard"
                            src={AssetQolboard}
                            logo={AssetQolboardLogo}
                            href={"https://qolboard.com"}
                        />
                        <Tile
                            headlines={["Backend Developer"]}
                            title="Spray Plan Manager - Hort Plus"
                            src={AssetNotFound}
                            logo={AssetNotFound}
                            href="https://sprayplan.nz"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
