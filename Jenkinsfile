pipeline {
    agent any

    environment {
//         REGISTRY = "your.private.registry.com"
//         IMAGE_NAME = "your-app-name"
//         DOCKER_CREDENTIALS_ID = "docker-registry-credentials"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'git@github.com/randrost/kitchensink.git',
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

//         stage('Push to Registry') {
//             steps {
//                 script {
//                     docker.withRegistry("https://${REGISTRY}", "${DOCKER_CREDENTIALS_ID}") {
//                         dockerImage.push()
//                         dockerImage.push("latest") // keep a 'latest' tag
//                     }
//                 }
//             }
//         }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ Build and push successful!"
        }
        failure {
            echo "❌ Build or push failed."
        }
    }
}
