pipeline {
    
    agent any

    stages {   
	stage('WS-Cleanup') {
            steps {
		    cleanWs()
            }
        }
        stage('Checkout') {
            steps {
		    git branch: 'main', url: 'https://github.com/ganeshchandran/jenkins-node-snake-game.git'
            }
        }
        
        stage('AppTest') {
            steps {
                dir('code') {
                sh 'npm install'    
		        sh 'npm test'
                }
            }
        }
        
        stage('WebTest') {
            steps {
                dir('code') {
                
                sh 'sudo pm2 --name SnakeGame start npm -- start'
                sleep 10
                httpRequest ignoreSslErrors: true, responseHandle: 'NONE', url: 'http://localhost:3000', wrapAsMultipart: false
                sleep 10
                sh 'sudo pm2 delete SnakeGame'
                }
            }
            
        }
        
        
        
	
	
        //stage('Email Notification') {
        //    steps {
        //        mail bcc: '', body: 'Jenkins Sample Email', cc: '', from: '', replyTo: '', subject: 'Jenkins Build Success', to: 'ganeshchandran@live.in'
        //    }
        //}
 }
 }
