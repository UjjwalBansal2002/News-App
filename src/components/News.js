import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize: 2,
        category:'general'
    }
    static propTypes ={
        country:PropTypes.string,
        pageSize:PropTypes.number,

    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2beb184350ba4eef85599689fba00e6d&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles, totalResults: parseData.totalResults,
            loading: false

        })

    }
    handlePreviousClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2beb184350ba4eef85599689fba00e6d&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false

        })

    }
    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2beb184350ba4eef85599689fba00e6d&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            let parseData = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false


            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">NewsMonkey Top Headlines</h1>
                {this.state.loading && <Spinner></Spinner>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (<div className="col-sm-6" key={element.url}>
                            <Newsitem title={element.title} desc={element.description} imageUrl={element.urlToImage} newsUrl={element.url}></Newsitem>
                        </div>)
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button disabled={this.state.page >= this.state.totalResults / this.props.pageSize} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News