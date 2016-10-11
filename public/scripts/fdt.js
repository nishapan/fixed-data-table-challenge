var Column = FixedDataTable.Column;
var Cell = FixedDataTable.Cell;
var Table = FixedDataTable.Table;

var MyTable = React.createClass({
	loadMetricsFromServer: function() {
		$.ajax({
			url: this.props.metrics_url,
			dataType: 'json',
			cache: false,
			success: function(metrics) {
				var ads = this.state.ads;
				for(var i = 0; i < ads.length; i++){
					for(var j = 0; j < metrics.rows.length; j++){
						if(metrics.rows[j].remote_id == ads[i].remote_id){
							var name = ads[i].name;
							ads[i] = metrics.rows[j];
							ads[i].name = name;
							break;
						}
					}
				}
				this.setState({ads: ads});
				this.setState({column_names: metrics.column_names})
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.metrics_url, status, err.toString());
			}.bind(this)
		});
	},
	loadAdsFromServer: function() {
		$.ajax({
			url: this.props.ads_url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
				      ads: data.ads
				});
				this.loadMetricsFromServer();
				
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.ads_url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return ({
		      ads:[],
		      column_names: []      
		    });
	},
	componentDidMount: function() {
		this.loadAdsFromServer();
	},
	render: function() {
	   var ads = this.state.ads;
		var column_names = this.state.column_names;
		var cols = [];
	   column_names.forEach(function(col_name) {
	          cols.push(
		 			<Column
					header={<Cell>{col_name}</Cell>}
		 			cell={({rowIndex, ...props}) => (
		 					<Cell {...props}>
		 					{ads[rowIndex][col_name]}
		 				</Cell>
		 			)}
					width={150}
		 			/>
	          );
	      });
			
		return (
			<Table
			rowHeight={50}
			rowsCount={ads.length}
			width={1000}
			minWidth={500}
			height={500}
			headerHeight={50} 
			{...this.props}>
			<Column
			header={<Cell>Ad Name</Cell>}
			cell={({rowIndex, ...props}) => (
				<Cell {...props}>
				{ads[rowIndex].name}
				</Cell>
			)}
			fixed={true}
			width={100}
			/>
			{cols}
			</Table>
		);
	}
});

ReactDOM.render(
	<MyTable ads_url="/api/ads" metrics_url="/api/metrics"/>,
	document.getElementById('content')
);