pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_USER = 'devsalioug'
        FRONTEND_IMAGE = "${DOCKER_USER}/site1_frontend"
        BACKEND_IMAGE = "${DOCKER_USER}/site1_backend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Linting et Tests') {
            parallel {
                stage('Backend tests') {
                    agent {
                        docker {
                            image 'python:3.11-slim'
                            args '-v /var/run/docker.sock:/var/run/docker.sock'
                        }
                    }
                    steps {
                        dir('backend') {
                            sh '''
                                pip install --upgrade pip
                                pip install -r requirements.txt
                                pip install flake8
                                flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
                                python manage.py test
                            '''
                        }
                    }
                }
                stage('Frontend tests') {
                    agent {
                        docker {
                            image 'node:18'
                            args '-v /var/run/docker.sock:/var/run/docker.sock'
                        }
                    }
                    steps {
                        dir('frontend') {
                            sh '''
                                npm install
                                npm run lint || true
                                npm test -- --watchAll=false || true
                            '''
                        }
                    }
                }
            }
        }

        stage('Build des images Docker') {
            steps {
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} -t ${BACKEND_IMAGE}:latest ."
                }
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} -t ${FRONTEND_IMAGE}:latest ."
                }
            }
        }

        stage('Push vers Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.DOCKER_HUB_CREDENTIALS_ID,
                                                   passwordVariable: 'DOCKER_PWD',
                                                   usernameVariable: 'DOCKER_USR')]) {
                    sh 'echo "$DOCKER_PWD" | docker login -u "$DOCKER_USR" --password-stdin'
                    sh "docker push ${BACKEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Déploiement sur Kubernetes') {
            steps {
                sh """
                    kubectl set image deployment/backend backend=${BACKEND_IMAGE}:${IMAGE_TAG} -n distributed-app
                    kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}:${IMAGE_TAG} -n distributed-app
                    kubectl rollout status deployment/backend -n distributed-app
                    kubectl rollout status deployment/frontend -n distributed-app
                """
            }
        }
    }

    post {
        always {
            sh 'docker logout'
            cleanWs()
        }
        success {
            echo "Pipeline CI/CD terminé avec succès !"
        }
        failure {
            echo "Le pipeline a échoué. Vérifiez les logs."
        }
    }
}