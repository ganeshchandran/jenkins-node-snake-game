pipeline {
    
    agent any

    stages {   
	stage('Workspace Cleanup') {
            steps {
		    cleanWs()
            }
        }
        stage('Git Checkout') {
            steps {
		    git branch: 'main', url: 'https://github.com/ganeshchandran/jenkins-node-snake-game.git'
            }
        }
        
        stage('Code Analysis') {
            steps {
                dir('code') {
                sh 'npm install'    
		        sh 'npm test'
                }
            }
        }
        
        stage('SAST Analysis') {
            steps {
		    sh 'sudo docker exec -i -w /usr/src/jenkins/workspace/snake-multiplayer/code nodejsscan nodejsscan .'
            }
        }
        
        stage('App Test') {
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
