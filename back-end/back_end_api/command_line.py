import back_end_api
import sys

func_to_call = getattr(back_end_api, sys.argv[1])
print(func_to_call(sys.argv[1:]))