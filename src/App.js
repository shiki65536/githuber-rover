import { GithubProvider } from './context/GithubContext';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Search from './components/Search';

function App() {
  return (
    <GithubProvider>
    <div className="App">
      <nav>
        <Navbar />
      </nav>
      <Search />
      <Dashboard />
    </div>
    </GithubProvider>

  );
}

export default App;
