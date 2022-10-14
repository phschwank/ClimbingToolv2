import configparser

# source code from: https://www.youtube.com/watch?v=Q8iYj2ypWss&list=PLrOQsSoS-V6-LRHG_8q0a4KBkWlTWeKhe&index=4
def config(filename="database.ini", section="postgresql"):
    """ 
    filename must include path to ini file relative to the file that 
    calls the config function and not relative to the config function itself
    """
    # create a parser
    parser = configparser.ConfigParser()
    # read config file
    parser.read(filename)
    if not parser.has_section(section):
        raise Exception("Section {0} is not found in the {1} file.".format(section, filename))
    params = parser.items(section)
    return {param[0]: param[1] for param in params}