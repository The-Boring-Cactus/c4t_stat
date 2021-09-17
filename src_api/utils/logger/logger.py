import logging


'''
Logger levels:
    CRITICAL 50
    ERROR    40
    WARNING  30
    INFO     20
    DEBUG    10
    NOTSET    0
'''


logging.basicConfig(filename='log.txt',
                    filemode='w',
                    format='%(asctime)s (%(levelname)7s) %(name)-30s: %(message)s',
                    datefmt='%Y/%m/%d %H:%M:%S',
                    level=logging.DEBUG)

''' urllib '''
log_urllib = logging.getLogger('urllib3')
log_urllib.setLevel(level=logging.ERROR)
