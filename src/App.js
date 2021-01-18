import React from 'react';
import './App.css';
import Grid from './components/Grid';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lightTheme: true,
		};
		this.toggleTheme = this.toggleTheme.bind(this);
	}

    toggleTheme() {
        this.setState(prevState => ({
            lightTheme: !prevState.lightTheme
        }));
    }

	render() {

		const lightTheme = this.state.lightTheme;

		return (
			<div className="App">
				<header className={`App-header-${lightTheme ? 'light' : 'dark'}`}>
					<button onClick={this.toggleTheme}>
						Toggle Theme
					</button>
					<Grid 
						lightTheme={lightTheme}
					/>
				</header>
			</div>
		)
	}
  
}

  //   <div className="App">
  //     <header className="App-header">
  //       <Grid
  //         lightTheme={this.props.lightTheme}
  //       />
  //     </header>
  //   </div>
  // );