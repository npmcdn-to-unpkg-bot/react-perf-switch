(function () {
if (!React || !React.addons) {
  return;
}

const perf = React.addons.Perf;

class PerfSwitch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isTest: false,
      printInclusive: true,
      printOperations: false,
      printWasted: true
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle () {
    const { printInclusive, printOperations, printWasted } = this.state;

    let isTest = !this.state.isTest;
    if (isTest) {
      perf.start();
      console.log('React.addons.perf.start...');
    } else {
      perf.stop();
      if (printInclusive) {
        console.log('React.addons.perf.printInclusive');
        perf.printInclusive();
      }

      if (printOperations) {
        console.log('React.addons.Perf.printOperations');
        perf.printOperations ? perf.printOperations() : perf.printDOM();
      }

      if (printWasted) {
        console.log('React.addons.Perf.printWasted');
        perf.printWasted();
      }
    }
    this.setState({ isTest });
  }

  render () {
    if (!perf) {
      return <noscript />;
    } else {
      let color = this.state.isTest ? 'green' : '#cccccc';

      return (
        <a href="javascript:;" style={{ display: 'block', width: '2rem', height: '2rem' }}>
          <svg style={{ width: '100%', height: '100%', opacity: '0.5' }} onClick={this.handleToggle} width="32" height="32" viewBox="0 0 32 32"><g transform="scale(0.03125, 0.03125)"><path d="M969.142857 548.571429q0 14.848-10.861714 25.709714t-25.709714 10.861714l-128 0q0 97.718857-38.290286 165.705143l118.857143 119.442286q10.861714 10.861714 10.861714 25.709714t-10.861714 25.709714q-10.276571 10.861714-25.709714 10.861714t-25.709714-10.861714l-113.152-112.566857q-2.852571 2.852571-8.557714 7.424t-23.990857 16.274286-37.156571 20.845714-46.848 16.566857-55.442286 7.424l0-512-73.142857 0 0 512q-29.147429 0-58.002286-7.716571t-49.700571-18.870857-37.705143-22.272-24.868571-18.578286l-8.557714-8.009143-104.557714 118.272q-11.446857 11.995429-27.428571 11.995429-13.714286 0-24.576-9.142857-10.861714-10.276571-11.702857-25.417143t8.850286-26.587429l115.419429-129.718857q-33.133714-65.133714-33.133714-156.562286l-128 0q-14.848 0-25.709714-10.861714t-10.861714-25.709714 10.861714-25.709714 25.709714-10.861714l128 0 0-168.009143-98.852571-98.852571q-10.861714-10.861714-10.861714-25.709714t10.861714-25.709714 25.709714-10.861714 25.709714 10.861714l98.852571 98.852571 482.304 0 98.852571-98.852571q10.861714-10.861714 25.709714-10.861714t25.709714 10.861714 10.861714 25.709714-10.861714 25.709714l-98.852571 98.852571 0 168.009143 128 0q14.848 0 25.709714 10.861714t10.861714 25.709714zM694.857143 219.428571l-365.714286 0q0-75.995429 53.430857-129.426286t129.426286-53.430857 129.426286 53.430857 53.430857 129.426286z" fill={color}></path></g></svg>
          <div className="options">
            <div className="inner">
              <label>printInclusive <input type="checkbox" onChange={(e) => { this.setState({ printInclusive: e.target.checked }); }} checked={this.state.printInclusive} /></label>
              <label>printWasted <input type="checkbox" onChange={(e) => { this.setState({ printWasted: e.target.checked }); }} checked={this.state.printWasted} /></label>
              <label>printOperations <input type="checkbox" onChange={(e) => { this.setState({ printOperations: e.target.checked }); }} checked={this.state.printOperations} /></label>
            </div>
          </div>
        </a>
      );
    }
  }
}

const className = 'react-perf-switch-wrap';

let div = document.createElement('div');
div.className = className;
document.body.appendChild(div);

let styleSheet = `
.${className} {
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;
  z-index: 99999;
}

.${className} div.options {
  display: none;
  position: absolute;
  bottom: 0;
  right: 100%;
  width: 10.5em;
}

.${className} div.options div.inner {
  position: relative;
  border: solid 1px rgba(0,0,0,0.3);
  background: #fed;
  width: 10em;
  margin-right: 1em;
  text-align: right;
  padding: 0.5em;
  border-radius: 8px;
}


.${className} a:hover div.options {
  display: block;
}

.${className} div.inner::before {
  content: "";
  position: absolute;
  bottom: 0.6em;
  right: -.4em;
  padding: .35em;
  background: inherit;
  border: inherit;
  border-left: 0;
  border-top: 0;
  transform: rotate(-45deg);
}
`;

let style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = styleSheet;
document.head.appendChild(style);

ReactDOM.render(<PerfSwitch />, div);

})();
