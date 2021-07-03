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
                sleep 10
                sh 'sudo rm -rf node_modules'
                }
            }
            
        }
        
        stage('Docker Build and Push') {
            steps {
		        script {
			            docker.withRegistry('https://registry.hub.docker.com', 'docker-credential')
			            {
			            dockerImage = docker.build "registry.hub.docker.com/ganeshchandran/multiplayer-snake-game:$BUILD_NUMBER"
		    	        dockerImage.push()
			            }
			            sh 'sed -i s/multiplayer-snake-game/multiplayer-snake-game:$BUILD_NUMBER/g docker-compose.yaml'
		                }
                    }
        }
        
        stage('Docker Image Scan') {
            steps {
		            withCredentials([file(credentialsId: 'dockerhub-credential', variable: 'dockerhubconfig')]) {
                        sh 'mkdir -p var/lib/jenkins/.docker'
                        sh 'cp -f $dockerhubconfig /var/lib/jenkins/.docker/config.json'
                        //sh 'docker scan registry.hub.docker.com/ganeshchandran/multiplayer-snake-game:$BUILD_NUMBER --accept-license --json'
                        sleep 10
                        sh 'docker rmi registry.hub.docker.com/ganeshchandran/multiplayer-snake-game:$BUILD_NUMBER'
                    }
            }
        }
        
        stage('Web Deployment') {
            steps {
                dir('ansible') {
                sh 'ansible-playbook deployment.yaml'
                }
            }
            
        }
        
        
        stage('Email Notification') {
            steps {
                emailext attachLog: true, body: "Please find attached log for more details", subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'", to: 'ganeshchandran90@gmail.com'
            }
        }
        
    
    }
}
