FROM amazonlinux:latest
RUN yum install -y python37 && \
  yum install -y python3-pip && \
  yum install -y zip && \
  yum clean all
RUN python3.7 -m pip install --upgrade pip && \
  python3.7 -m pip install virtualenv

# https://towardsdatascience.com/how-to-install-python-packages-for-aws-lambda-layer-74e193c76a91
# docker build -f "dockerfile" -t lambdalayer:latest .
# docker run -it --name lambdalayer lambdalayer:latest bash
# python3.7 -m venv numpy
# source numpy/bin/activate
# pip install numpy -t ./python
# deactivate
# zip -r python.zip ./python/

# docker cp lambdalayer:python.zip $(pwd)/
