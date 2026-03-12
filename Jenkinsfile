pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Tahap ini sudah benar di log kamu
                git url: 'https://github.com/audelianainggolan/music-course-api.git', 
                    branch: 'main'
            }
        }
        
        stage('Inject ENV') {
            steps {
                // Di Windows, kita pakai "bat" dan copy file-nya
                withCredentials([file(credentialsId: 'env-file', variable: 'ENV_FILE')]) {
                    bat "copy %ENV_FILE% .env"
                }
            }
        }

        stage('Build Docker') {
            steps {
                // Ganti "sh" jadi "bat"
                bat 'docker build -t music-course-api:latest .'
            }
        }

        stage('Deploy') {
            steps {
                // Hapus container lama (jika ada) baru jalankan yang baru
                // "|| ver > nul" itu trik Windows agar tidak error kalau container belum ada
                bat 'docker rm -f music-course-api || ver > nul'
                bat 'docker run -d -p 3000:3000 --name music-course-api music-course-api:latest'
            }
        }
    }
}