from back_end_api import frontend_funcs
import sys

func_to_call = getattr(frontend_funcs, sys.argv[1])
if len(sys.argv) == 3:
	print(func_to_call(sys.argv[2]))
else:
	print(func_to_call(sys.argv[2:]))