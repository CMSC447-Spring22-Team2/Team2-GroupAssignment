# Test file for running API functions (as running code directly within those files can make imports a nightmare).
# It is otherwise safe to remove. 

import back_end_api.frontend_funcs as front_funcs
import back_end_api.internal_funcs as in_funcs
result = front_funcs.get_column('census_tract')
print(result)