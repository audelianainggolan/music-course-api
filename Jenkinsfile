pipeline {
    agent any

    environment {
        PATH = '/usr/local/bin:/usr/bin:/bin'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/audelianainggolan/music-course-api.git', 
                branch: 'main'
            }
        }
        stage('Inject ENV') {
            steps {
                withCredentials([file(credentialsId: 'env-file', variable: 'ENV_FILE')]) {
                    sh 'source $ENV_FILE'
                }
            }
        }
        stage('Build Docker') {
            steps {
                sh 'docker build -t music-course-api:latest .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 8080:8080 --name music-course-api music-course-api:latest'
            }
        }
    }
}