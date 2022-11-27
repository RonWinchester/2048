import BoardView from "./components/Board";
import "./main.scss";
import "./styles.scss";

function App() {
  return (
    <div className="app">
      <BoardView />
      <footer className="footer">
        <p className="footer__elements">Design by <a href="https://www.behance.net/romaincousin" target="_balnk">Romain Cousin</a></p>
        <p className="footer__elements">Algorithm by <a href="https://github.com/IvanVergiliev/2048-react" target="_balnk">Ivan Vergiliev</a></p>
      </footer>
    </div>
  );
}

export default App;
