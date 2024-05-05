import articleImage from "../../assets/img1.jpg";
import "./Home.css";

function Home() {
  return (
    <div className='articleHome'>
      <h1>Create Your Own Column!</h1>
      <div className="content">
        <div className="sideImage">
          <img src={articleImage} alt="" className="artcleImage" />
        </div>
        <div className="sideText">
          <p className="lead">
            Here you can write for publication in a series, creating an article that usually offers commentary and opinions. Columns appear in newspapers, magazines and other publications, including blogs. They take the form of a short essay by a specific writer who offers a personal point of view. Columns are sometimes written by a composite or a team, appearing under a pseudonym, or (in effect) a brand name. Columnists typically write daily or weekly columns. Some columns are later collected and reprinted in book form.
          </p>
          <h3>Writing is Fun!</h3>
          <p className="lead">At its core, writing is the art of imagination. It allows us to escape the confines of reality and explore the vast realms of our minds. Whether crafting fantastical worlds in fiction or pondering philosophical musings in essays, writing gives us the freedom to create without limits. The joy lies in the endless possibilities that unfold with each stroke of the pen or tap of the keyboard.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

