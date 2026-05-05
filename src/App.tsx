import "./App.css";
import Tile from "./tile/Tile";
import AssetEnrolmy from "./assets/enrolmy.png";
import AssetBasis from "./assets/basis.png";
import AssetEnrolmyLogo from "./assets/enrolmy.logo.png";
import AssetBasisLogo from "./assets/basis.logo.png";
import Asset404 from "./assets/404.svg";

function App() {
    return (
        <>
            <div className="text-center">
                <h1>Jesse Reyneke-Barnard</h1>
            </div>
            <h2>Past Work Experience</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Tile
                    headlines={["Backend Engineer"]}
                    title="Basis"
                    src={AssetBasis}
                    logo={AssetBasisLogo}
                />
                <Tile
                    headlines={[
                        "Software Developer",
                        "Intern Software Developer",
                    ]}
                    title="Enrolmy Software"
                    src={AssetEnrolmy}
                    logo={AssetEnrolmyLogo}
                />
            </div>

            <h2>Projects</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Tile
                    headlines={["qolboard"]}
                    title="Personal Project"
                    src={Asset404}
                    logo={Asset404}
                />
                <Tile
                    headlines={["Spray Plan Manager"]}
                    title="Hort Plus"
                    src={Asset404}
                    logo={Asset404}
                />
            </div>
        </>
    );
}

export default App;
