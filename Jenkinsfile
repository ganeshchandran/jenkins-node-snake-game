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
			            //sh "docker rmi registry.hub.docker.com/ganeshchandran/jenkin-pipeline:$BUILD_NUMBER-${params.BRANCH}"
			            //sh "sed -i s/jenkin-pipeline:build-number/jenkin-pipeline:$BUILD_NUMBER-${params.BRANCH}/g jenkins-deployment.yaml"
			            //sh "sed -i s/namespace-value/${params.ENVIRONMENT}/g jenkins-deployment.yaml"
                        //sh "sed -i s/namespace-value/${params.ENVIRONMENT}/g jenkins-deployment-service.yaml"
		                }
                    }
        }
        
        stage('Docker Image Scan') {
            steps {
		            withCredentials([file(credentialsId: 'dockerhub-credential', variable: 'dockerhubconfig')]) {
                        sh 'mkdir -p var/lib/jenkins/.docker'
                        sh 'cp -f $dockerhubconfig /var/lib/jenkins/.docker/config.json'
                        sh 'docker scan registry.hub.docker.com/ganeshchandran/multiplayer-snake-game:$BUILD_NUMBER --accept-license --json'
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
