import React, { Component, useState, useEffect } from 'react'
import { Container, Row, Col, Card, Tabs, Tab, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dataAnalysisAPI from '../api/dataAnalysisAPI'
import WordCountHistogram from '../components/visualizations/WordCountHistogram/WordCountHistogram'
import WordCountCloud from '../components/visualizations/WordCountCloud/WordCountCloud'
import SentimentPlot from '../components/visualizations/SentimentPlot/SentimentPlot'
import Botscore from '../components/Botscore/Botscore'
// import PublishForm from '../components/publishForm/PublishForm'

class DashboardPage extends Component {
  state ={
    botscore:{},
    botscoreLoaded:false
  }

  render() {
    // console.log(this.props)
    // set up word count data
    let word_count_data_long = this.props.location.state.user_data.word_counts.map((item) => {
      return { name: item[0], value: item[1] }
    })
    let word_count_data = word_count_data_long.slice(0, 25)

    // set up word cloud data
    let word_count_cloud_data_long = this.props.location.state.user_data.word_counts.map((item) => {
      return { text: item[0], value: item[1] }
    })
    let word_count_cloud_data = word_count_cloud_data_long.slice(0, 250)

    // set up retweet count data
    let rt_count_data_long = this.props.location.state.user_data.filtered_text_data.retweet_user_counts.map((item) => {
      return { name: item[0], value: item[1] }
    })
    let rt_count_data = rt_count_data_long.slice(0, 25)
    // set up retweet cloud data
    let rt_count_cloud_data_long = this.props.location.state.user_data.filtered_text_data.retweet_user_counts.map((item) => {
      return { text: item[0], value: item[1] }
    })
    let rt_count_cloud_data = rt_count_cloud_data_long.slice(0, 250)

    // set up hashtags count data
    let hashtag_count_data_long = this.props.location.state.user_data.hashtag_counts.map((item) => {
      return { name: item[0], value: item[1] }
    })
    let hashtag_count_data = hashtag_count_data_long.slice(0, 25)
    // set up hashtags cloud data
    let hashtag_count_cloud_data_long = this.props.location.state.user_data.hashtag_counts.map((item) => {
      return { text: item[0], value: item[1] }
    })
    let hashtag_count_cloud_data = hashtag_count_cloud_data_long.slice(0, 250)


    const handlePublish = (event) => {
      event.preventDefault()
      let graph_code = document.getElementById(event.target.id.slice(1,)).innerHTML
      const d = new Date().toISOString().slice(0,10)
      const graphicObj = {
      title: "@" + this.props.location.state.handle + " " + event.target.id.slice(1,),
      author: 'anonymous',
      date_created: d,
      graph_code_js: graph_code
    }
    
    dataAnalysisAPI.addGraphic(graphicObj)
    .then((response) => { })
    }

    const botCallback = (botscore) => {
      this.setState({
        botscore:botscore,
        botscoreLoaded:true
      })
    }

    function LoadingButton(props) {
      const [isLoading, setLoading] = useState(false);
      
      useEffect(() => {
        if (isLoading) {
          dataAnalysisAPI.fetchBotScore(props.handle).then((apiResponseJSON) => {
            setLoading(false);
            props.callBack(apiResponseJSON)
          });
        }
      }, [isLoading]);
    
      const handleClick = () => setLoading(true);

      
    
      return (
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={!isLoading ? handleClick : null}
        >
          {isLoading ? 'Loading…' : 'Get Bot Score'}
        </Button>
      );
    }
    
    return (
      <div>
        <Container>
          <Row className="justify-content-center text-center">
    <h1>Dashboard for @{this.props.location.state.handle}</h1>
          </Row>
          <Row className="justify-content-center text-center">
            <h2><Link to={`/`}>Home</Link></h2>
          </Row>
         
            <Tabs>
              <Tab eventKey="sentiment" title='Sentiment'>
              <Card>
                <Card.Header>Sentiment Polarity and Subjectivity<Button style={{float:'right'}} id='BsentimentBody' onClick={handlePublish}>Publish</Button></Card.Header>
                <Card.Body id='sentimentBody'>
                  <SentimentPlot data={this.props.location.state.user_data.sentiments} />
                </Card.Body>
              </Card>
              </Tab>
              <Tab eventKey="word" title='Word Count'>
              <Card>
                <Card.Header>Word Count<Button style={{float:'right'}} id='BwordCount' onClick={handlePublish}>Publish</Button></Card.Header>
                <Card.Body id='wordCount'>
                  <WordCountHistogram data={word_count_data} className='wordCount'/>
                </Card.Body>
              </Card>
              </Tab>
              <Tab eventKey="retweet" title='Retweet Count'>
              <Card>
                <Card.Header>Retweet Count<Button style={{float:'right'}} id='BretweetCount' onClick={handlePublish}>Publish</Button></Card.Header>
                <Card.Body id='retweetCount'>
                  <WordCountHistogram data={rt_count_data} className='retweetCount'/>
                </Card.Body>
              </Card>
              </Tab>
              <Tab eventKey="hashtag" title='Hashtag Count'>
                <Card>
                  <Card.Header>Hashtag Count<Button style={{float:'right'}} id='BhashtagCount' onClick={handlePublish}>Publish</Button></Card.Header>
                  <Card.Body id='hashtagCount'>
                    <WordCountHistogram data={hashtag_count_data} className='hashtagCount'/>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="botscore" title='Bot Score'>
                <Card>
                  <Card.Header>Bot Score<Button style={{float:'right'}} id='BbotScore' onClick={handlePublish}>Publish</Button></Card.Header>
                  <Card.Body id='botScore'>
                    {this.state.botscoreLoaded ? <Botscore data = {this.state.botscore}/> : <LoadingButton callBack={botCallback} handle={this.props.location.state.handle} sz='lg'/>}
                    {/* <LoadingButton callBack={botCallback} handle={this.props.location.state.handle} sz='lg'/> */}
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
            
        </Container>
        {/* <WordCountHistogram data={rt_count_data}/> */}
        {/* <WordCountCloud data={rt_count_cloud_data}/> */}
      </div>
    )
  }
}

export default DashboardPage